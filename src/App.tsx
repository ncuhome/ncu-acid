import { useEffect } from "react";
import Loading from "./components/loading";
import { useAppReady } from "mincu-react";
import QRCode from "react-qr-code";
import { dataModule, networkModule } from "mincu-react";
import * as ReactGA from "react-ga";
import "./App.css";

ReactGA.initialize("UA-80324378-26");

const App = () => {
  const isReady = useAppReady();
  // const { top } = useSafeArea();

  useEffect(() => {
    networkModule.getStoredToken();
    ReactGA.pageview(location.pathname);
  }, []);

  const xh = dataModule.userInfo.profile.entireProfile?.base_info?.xh ?? "";
  const xm = dataModule.userInfo.profile.entireProfile?.base_info?.xm ?? "";

  const qrData = {
    userId: xh,
    name: xm,
  };


  // https://rd.wechat.com/qrcode/confirm?block_type=101&content=%7B%22userId%22%3A%225701119201%22%2C%22name%22%3A%22%E8%94%A1%E5%85%83%E7%86%A0%22%7D&lang=zh_CN&scene=4&bankey=0148c5fcb2dd19c73cc8882e6f1d9838&midpagecode=ba13fa0e1d660ac98da03b8f4c3fae9ec69bf0790edc1c48433a6659a89a171e
  // https://rd.wechat.com/qrcode/confirm?block_type=101&content=%7B%22userId%22%3A%225504118087%22%2C%22name%22%3A%22%E5%AD%99%E7%BF%94%E5%AE%87%22%7D&lang=zh_CN&scene=34&bankey=78f8d9f147ddfeba9d966f8efffadd6b&midpagecode=73e73abb9f190a7aa890fb1cd4270176724ef38c992c051e6e96a17a8e76b77f

  
  const content = encodeURIComponent(JSON.stringify(qrData));
  const url = `https://rd.wechat.com/qrcode/confirm?block_type=101&lang=zh_CN&content=${content}`

  if (!isReady) {
    return <Loading />;
  }

  return (
    <div>
      <div
        style={{
          // marginTop: `${top + 36}px`,
          marginTop: `36px`,
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
        <QRCode value={url} fgColor={"#1D3A74"} size={320} />
      </div>
    </div>
  );
};

export default App;
