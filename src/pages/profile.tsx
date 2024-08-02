import React from "react";

import NickName from "../components/auth/Nickname";
import AppBar from "../components/shared/AppBar";
import Title from "../components/shared/Title";

const Profile: React.FC = () => {

  return (
    <div className="mx-auto bg-white flex flex-col h-screen">
      <AppBar />
      <Title title="프로필 설정" />
      <div className="flex-grow flex flex-col justify-center px-6">
        <NickName isLogin ={true}/>
      </div>
    </div>
  );
};

export default Profile;
