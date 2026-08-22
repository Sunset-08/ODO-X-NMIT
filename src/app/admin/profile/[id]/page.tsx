import ProfilePage from "@/app/(app)/profile/[id]/page";

export default function AdminEmployeeProfilePage({ params }: { params: { id: string } }) {
  return <ProfilePage params={params} />;
}
