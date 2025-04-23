
import { FileUpload } from "../components/FileUpload";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            CSV Workflow Trigger
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your CSV file to trigger the workflow. We'll handle the rest.
          </p>
        </div>
        <FileUpload />
      </div>
    </div>
  );
};

export default Index;
