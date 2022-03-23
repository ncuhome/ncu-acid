import { useEffect, useState } from "react";
import Loading from "./components/loading";
import utf16to8 from "./lib/util";
import { eventModule, useAppReady } from "mincu-react";
import QRCode from "react-qr-code";
import { dataModule, uiModule } from "mincu-react";
import * as ReactGA from "react-ga";
import "./App.css";

ReactGA.initialize("UA-80324378-26");

const App = () => {
  const isReady = useAppReady();
  const [show, setShow] = useState(true);

  useEffect(() => {
    uiModule.handleShowHeader(false);
    ReactGA.pageview(location.pathname);
  }, []);

  const xh = dataModule.userInfo.profile.entireProfile?.base_info?.xh ?? "";
  const xm = dataModule.userInfo.profile.entireProfile?.base_info?.xm ?? "";

  const qrData = {
    userId: xh,
    name: utf16to8(xm),
  };

  if (!isReady) {
    return <Loading />;
  }

  const renderHeader = () => {
    return (
      <div className="header" style={{ paddingTop: dataModule.inset.top }}>
        <img
          src={"/exit.svg"}
          className="exit"
          onClick={() => uiModule.exit()}
        />
        <div className="title">南大核酸码</div>

        <div style={{ flex: 1 }} />
        <img
          src={"/more.svg"}
          className="more"
          onClick={() => eventModule.showShare()}
        />
      </div>
    );
  };

  const renderTips = () => {
    if (!show) return null;

    return (
      <>
        <div style={{ height: "40px" }}></div>
        <div className="tip">
          本码若无法正常使用，可点击复制下面的链接到【微信】
        </div>
        {/* <div className="tip-2">https://jhrz.ncu.edu.cn/ndhsjc/student</div> */}

        <div className="tip-x" style={{ bottom: dataModule.inset.bottom + 20 }}>
          为战胜新冠疫情，保证南大核酸码被大规模推广使用，本微应用作为南大核酸码快捷入口供同学们使用。
        </div>
      </>
    );
  };

  return (
    <div onClick={() => setShow(!show)}>
      {renderHeader()}
      <div
        style={{
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
        <QRCode value={JSON.stringify(qrData)} fgColor={"#1D3A74"} size={320} />

        {renderTips()}
      </div>
    </div>
  );
};

export default App;
