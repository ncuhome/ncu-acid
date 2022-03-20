import { useEffect } from "react";
import Loading from "./components/loading";
import { useAppReady } from "mincu-react";
import QRCode from "react-qr-code";
import { dataModule, networkModule } from "mincu-react";
import "./App.css";

const App = () => {
  const isReady = useAppReady();

  useEffect(() => {
    networkModule.getStoredToken();
  }, []);

  const xh = dataModule.userInfo.profile.entireProfile?.base_info?.xh ?? "";
  const xm = dataModule.userInfo.profile.entireProfile?.base_info?.xm ?? "";

  const qrData = {
    userId: xh,
    name: xm,
  };

  if (!isReady) {
    return <Loading />;
  }

  return (
    <div>
      <div
        style={{
          marginTop: "36px",
          marginRight: 10,
          marginLeft: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="text">请在核酸排队时出示</div>
        <div className="text">姓名: {xm}</div>
        <div className="text">学号/工号/B类ID: {xh}</div>
        <div style={{ height: "36px" }}></div>
        <QRCode value={JSON.stringify(qrData)} fgColor={"#1D3A74"} size={320} />
      </div>
    </div>
  );
};

export default App;
