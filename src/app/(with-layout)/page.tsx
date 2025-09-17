import Chart from "@/components/common/chart";
import LogoutAlertDialog from "@/app/(with-layout)/_shared/components/logout-alert-dialog";

export default function Home() {
  return (
      <div>
        <Chart />
        <Chart />
        <LogoutAlertDialog/>
      </div>
  );
}
