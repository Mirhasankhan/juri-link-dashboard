"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateServiceMutation } from "@/redux/features/service/service.api";
import { toast } from "sonner";

type FormValues = {
  serviceName: string;
  importance: string;
  description: string;
  dyk: string;
  serviceMedia: FileList;
};

const AddService = () => {
  const [createService, { isLoading }] = useCreateServiceMutation();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    const { serviceName, importance, description, dyk, serviceMedia } = data;

    const bodyData = { serviceName, importance, description, dyk };
    formData.append("bodyData", JSON.stringify(bodyData));
    if (serviceMedia && serviceMedia.length > 0) {
      formData.append("serviceMedia", serviceMedia[0]);
    }

    try {
      const response: any = await createService(formData);
      if (response.data) {
        reset();
        toast.success("New Service Created Successfully");
      } else {
        toast.error(response.error.data.message);
      }

      // setIsFormVisible(false);
    } catch (error) {
      console.log("Failed to create service", error);
    }
  };

  return (
    <div className="max-w-full mx-auto">
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="px-4 py-2 bg-bprimary text-white rounded mb-4"
        >
          Add New Service
        </button>
      )}

      <div
        className={`overflow-hidden bg-white p-6 rounded-[6px] transition-all duration-500 ease-in-out ${
          isFormVisible ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <h1 className="text-xl font-medium">Create New Service</h1>
        <p className="text-gray-600 pb-6">
          Fill in the details below to create a new service.
        </p>
        {isFormVisible && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="pb-1 block font-medium text-gray-600"
                  htmlFor=""
                >
                  Service Name
                </label>
                <input
                  type="text"
                  placeholder="Enter service name"
                  className="input-design w-full"
                  {...register("serviceName", {
                    required: "Service name is required",
                  })}
                />
                {errors.serviceName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.serviceName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="pb-1 block font-medium text-gray-600"
                  htmlFor=""
                >
                  Service Media
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="input-design w-full"
                  {...register("serviceMedia", {
                    required: "Service media is required",
                  })}
                />
                {errors.serviceMedia && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.serviceMedia.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="pb-1 block font-medium text-gray-600"
                  htmlFor=""
                >
                  Service Importance
                </label>
                <textarea
                  placeholder="Importance"
                  className="input-design w-full"
                  {...register("importance", {
                    required: "Importance is required",
                    minLength: {
                      value: 15,
                      message: "Importance must be at least 15 characters",
                    },
                  })}
                />
                {errors.importance && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.importance.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="pb-1 block font-medium text-gray-600"
                  htmlFor=""
                >
                  Service Description
                </label>
                <textarea
                  placeholder="Description"
                  className="input-design w-full"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 15,
                      message: "Description must be at least 15 characters",
                    },
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                className="pb-1 block font-medium text-gray-600"
                htmlFor=""
              >
                Did you know?
              </label>
              <textarea
                placeholder="enter did you know text"
                className="input-design w-full"
                {...register("dyk", {
                  required: "Did You Know is required",
                  minLength: {
                    value: 15,
                    message: "Did you know must be at least 15 characters",
                  },
                })}
              />
              {errors.dyk && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dyk.message}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 cursor-pointer bg-bprimary font-medium text-white rounded disabled:opacity-30"
              >
                {isLoading ? "Creating..." : "Create Service"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="px-4 py-2 cursor-pointer bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddService;
