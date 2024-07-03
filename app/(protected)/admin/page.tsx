'use client'


import { admin } from "@/actions/admin"
import FormSuccess from "@/components/FormSucces"
import RoleGate from "@/components/auth/RoleGate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useCurrentRole } from "@/hooks/useCurrentRole"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"

const AdminPage = () => {

  const onApiRouteClick = ()=>{
    fetch("/api/admin")
    .then((response)=>{
      if (response.ok) {
        toast.success("Allowed API routes")
      }else{
        toast.error("FORBIDDEN API routes")
      }
    })
  }

  const onServerActionClick = ()=>{
    admin()
    .then((data)=>{
      if (data.success) {
        toast.success("Allowed API routes")
      }
      if (data.error) {
        toast.error("FORBIDDEN Action")
      }

    })
  }

      return (
        <Card className="w-[600px] bg-white">
          <CardHeader className="text-2xl font-semibold text-center">Admin Page</CardHeader>
          <CardContent className="space-y-4">
            <RoleGate allowedRole={UserRole.ADMIN}>
              <FormSuccess message="U r allowed to see it"/>
            </RoleGate>
            <div className="flex flex-row items-center justify-between rounded-lg shadow-md p-3 ">
              <p className=" text-sm font-normal">Admin Only API Routes</p>
              <Button onClick={onApiRouteClick}>
                Click to test
              </Button>
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg shadow-md p-3 ">
              <p className=" text-sm font-normal">Admin Only Server Action</p>
              <Button  onClick={onServerActionClick}>
                Click to test
              </Button>
            </div>
          </CardContent>
        </Card>
          )
        }
        
        export default AdminPage
        
        
        

//For Server Components
        
// import { currentUserRole } from "@/lib/auth"

// const AdminPage = async () => {
//     const role = await currentUserRole()
//   return (
//     <div>Current Role = {role}</div>
//   )
// }

// export default AdminPage