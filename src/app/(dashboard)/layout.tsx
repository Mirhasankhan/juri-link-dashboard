import Wrapper from "@/components/dashboard/wrapper/Wrapper";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <div>
        <Toaster position="top-right" richColors />
        {children}
      </div>
    </Wrapper>
  );
};

export default DashboardLayout;
