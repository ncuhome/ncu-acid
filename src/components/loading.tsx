import { FC } from "react";

/**
 * @description 该阶段获取不到客户端任何数据
 */
const Loading: FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      加载中
    </div>
  );
};

export default Loading;
