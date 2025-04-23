
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
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

  const simulateUpload = async () => {
    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }

    toast({
      title: "Success!",
      description: "Your file has been uploaded and the workflow has been triggered.",
    });

    setUploading(false);
    setFile(null);
    setProgress(0);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out ${
          isDragging
            ? "border-indigo-400 bg-indigo-50"
            : "border-gray-300 hover:border-indigo-300"
        }`}
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
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            {file ? file.name : "Drop your CSV file here"}
          </h3>
          <p className="text-gray-500 text-sm">
            or click to browse from your computer
          </p>
        </div>
      </div>

      {file && !uploading && (
        <div className="mt-4 flex justify-center">
          <Button onClick={simulateUpload} className="bg-indigo-600 hover:bg-indigo-700">
            Upload and Trigger Workflow
          </Button>
        </div>
      )}

      {uploading && (
        <div className="mt-4">
          <Progress value={progress} className="h-2 bg-gray-100" />
          <p className="text-sm text-center mt-2 text-gray-600">
            Uploading... {progress}%
          </p>
        </div>
      )}
    </div>
  );
};
