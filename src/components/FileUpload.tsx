
import { useState } from 'react';
import { Upload, CheckCircle, Link as LinkIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { trackServiceUsage } from '../models/UserServiceUsage';

interface FileUploadProps {
  serviceId: string;
  serviceName: string;
  userEmail: string;
}

export const FileUpload = ({ serviceId, serviceName, userEmail }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [webhookUrl, setWebhookUrl] = useState<string>(
    localStorage.getItem(`n8nWebhook-${serviceId}`) || ""
  );
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const triggerN8nWorkflow = async (fileData: string) => {
    if (!webhookUrl) {
      toast({
        title: "No n8n webhook configured",
        description: "Please enter your n8n webhook URL",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      // Save the webhook URL for this service
      localStorage.setItem(`n8nWebhook-${serviceId}`, webhookUrl);
      
      // Send the file data to the n8n webhook
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Add this to handle CORS
        body: JSON.stringify({
          fileData,
          fileName: file?.name,
          serviceId,
          serviceName,
          userEmail,
          timestamp: new Date().toISOString()
        }),
      });
      
      return true;
    } catch (error) {
      console.error("Error triggering n8n webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the n8n workflow. Please check the URL and try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const simulateUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setProgress(0);

    // Start reading the file
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileContent = event.target?.result as string;
      
      for (let i = 0; i <= 80; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setProgress(i);
      }
      
      // Trigger n8n workflow
      const success = await triggerN8nWorkflow(fileContent);
      
      if (success) {
        setProgress(100);
        
        // Track this service usage
        trackServiceUsage(userEmail, serviceId, serviceName);
        
        toast({
          title: "Success!",
          description: "Your file has been uploaded and the workflow has been triggered.",
        });
        
        setTimeout(() => {
          setUploading(false);
          setFile(null);
          setProgress(0);
          
          // Reload page to see updated usage stats
          window.location.reload();
        }, 1000);
      } else {
        setUploading(false);
        setProgress(0);
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700 mb-1">
          n8n Webhook URL
        </label>
        <div className="flex gap-2">
          <Input
            id="webhookUrl"
            type="text"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="Enter your n8n webhook URL"
            className="flex-grow"
          />
          <Button 
            variant="outline"
            onClick={() => {
              if (webhookUrl) {
                localStorage.setItem(`n8nWebhook-${serviceId}`, webhookUrl);
                toast({
                  title: "Webhook saved",
                  description: "Your n8n webhook URL has been saved",
                });
              }
            }}
          >
            <LinkIcon className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          This URL will receive your uploaded CSV data and trigger your n8n workflow
        </p>
      </div>
      
      <div
        className={`relative transition-all duration-300 ease-in-out ${
          isDragging
            ? "border-2 border-dashed border-indigo-400 bg-indigo-50/50"
            : "border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-gray-50/50"
        } rounded-xl p-8 mb-6`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center">
          <Upload className={`w-16 h-16 mx-auto mb-4 transition-colors duration-200 ${
            isDragging ? 'text-indigo-500' : 'text-gray-400'
          }`} />
          <h3 className="mb-2 text-xl font-medium text-gray-900">
            {file ? file.name : "Drop your CSV file here"}
          </h3>
          <p className="text-gray-500 text-sm">
            or click to browse from your computer
          </p>
        </div>
      </div>

      {file && !uploading && (
        <div className="flex justify-center">
          <Button 
            onClick={simulateUpload}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Upload and Trigger Workflow
          </Button>
        </div>
      )}

      {uploading && (
        <div className="space-y-4">
          <Progress value={progress} className="h-2 bg-gray-100" />
          <p className="text-sm text-center text-gray-600 animate-pulse">
            {progress < 100 ? `Uploading... ${progress}%` : "Processing complete!"}
          </p>
        </div>
      )}
    </div>
  );
};
