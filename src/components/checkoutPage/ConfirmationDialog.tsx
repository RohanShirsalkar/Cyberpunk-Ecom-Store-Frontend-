import { AlertTriangle } from "lucide-react";
import React from "react";

const ConfirmationDialog = ({
  handleConfirmation,
}: {
  handleConfirmation: (action: "confirm" | "cancel") => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="border-2 border-cyan-900 bg-black/60 shadow-lg p-5 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <AlertTriangle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-cyan-300 text-lg font-bold mb-1">PLACE_ORDER</h2>
          <p className="text-cyan-200 mb-4 text-center text-sm">
            Are you sure you want to place your order?
          </p>
          <div className="flex w-full space-x-2">
            <button
              className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-2 transition-all duration-200 border border-cyan-400"
              onClick={() => handleConfirmation("confirm")}
            >
              Confirm
            </button>
            <button
              className="flex-1 bg-black hover:bg-cyan-900 text-cyan-400 font-bold py-2 transition-all duration-200 border border-cyan-700"
              onClick={() => handleConfirmation("cancel")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
