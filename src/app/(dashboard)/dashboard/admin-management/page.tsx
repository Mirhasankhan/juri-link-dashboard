import AllAdmins from "@/components/dashboard/AllAdmins";
import CreateAdminModal from "@/components/dashboard/modal/AddAdminModal";

const AdminManagementPage = () => {
  return (
    <div>
      <div className="flex justify-between pb-8 items-center">
        <h1 className="text-2xl font-medium">Admin & Roles</h1>
        <CreateAdminModal></CreateAdminModal>
      </div>
      <AllAdmins></AllAdmins>
    </div>
  );
};

export default AdminManagementPage;
