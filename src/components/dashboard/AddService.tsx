"use client";

import { useState } from "react";
import { useCreateServiceMutation } from "@/redux/features/service/service.api";

const AddService = () => {
  const [serviceName, setServiceName] = useState("");
  const [createService, { isLoading }] = useCreateServiceMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceName.trim()) return;

    const data = {
      serviceName,
    };

    try {
      await createService(data).unwrap();
      setServiceName("");
    } catch (error) {
      console.error("Failed to create service", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <input
        type="text"
        placeholder="Service name"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        className="input-design"
        disabled={isLoading}
      />

      <button
        type="submit"
        disabled={isLoading || !serviceName}
        className="px-4 py-2 bg-bprimary mt-3 cursor-pointer text-white rounded disabled:opacity-30"
      >
        {isLoading ? "Creating..." : "Create Service"}
      </button>
    </form>
  );
};

export default AddService;
