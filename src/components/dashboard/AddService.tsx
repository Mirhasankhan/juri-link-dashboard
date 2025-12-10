"use client";
import { IFormInput } from "@/types/common";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  useCreateSubCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/features/category/category.api";

const AddService = () => {
  const { data: categories } = useGetCategoriesQuery("");

  const [categoryId, setCategoryId] = useState("");
  const [createService, { isLoading }] = useCreateSubCategoryMutation();
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!categoryId) {
      return toast.error("Select a category");
    }

    const formData = new FormData();

    const bodyData = {
      subCatName: data.subCatName,
      overview: data.overview,
    };
    formData.append("bodyData", JSON.stringify(bodyData));

    selectedFiles.forEach((file) => {
      formData.append("mediaUrl", file);
    });
    const response = await createService({ data: formData, id: categoryId });
    console.log(response);
    toast.success("Service Created Successfully");
    reset();
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="my-8 flex gap-3 font-medium items-center bg-primary text-white px-6 py-2 rounded-xl"
      >
        <Plus className="font-medium" size={20}></Plus> Add New Service
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            className="overflow-hidden border-2 border-dashed border-gray-500 rounded-lg p-6"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-3 md:gap-8">
                <div className="w-full">
                  <label className="block pb-1 font-medium" htmlFor="">
                    Service Name
                  </label>
                  <input
                    className="input-design"
                    type="text"
                    placeholder="Enter service name"
                    {...register("subCatName", {
                      required: "Service name is required",
                    })}
                  />
                  {errors.serviceName && (
                    <span className="text-red-400">
                      {errors.serviceName.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label className="block pb-1 font-medium" htmlFor="">
                    Upload Media
                  </label>
                  <input
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedFiles(Array.from(e.target.files));
                      }
                    }}
                    className="input-design"
                    type="file"
                    multiple
                  />
                </div>
              </div>

              <div className="md:flex w-full gap-6">
                <div className="w-full mt-2">
                  <label className="block pb-1 font-medium" htmlFor="">
                    Overview
                  </label>
                  <input
                    className="input-design"
                    type="text"
                    placeholder="enter service overview"
                    {...register("overview", {
                      required: "overview is required",
                    })}
                  />
                  {errors.overview && (
                    <span className="text-red-400">
                      {errors.overview.message}
                    </span>
                  )}
                </div>
                <div className="w-full mt-2">
                  <label className="block pb-1 font-medium" htmlFor="">
                    Select Category
                  </label>
                  <select
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="input-design"
                  >
                    <option value="">Select a category</option>
                    {categories?.result?.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-6">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="text-white text-center mt-6 bg-primary px-4 py-2 rounded-md font-medium"
                >
                  {isLoading ? (
                    <Loader2 className="mx-auto animate-spin"></Loader2>
                  ) : (
                    "Add Service"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="border text-center mt-6 bg-white px-4 py-2 rounded-md font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddService;
