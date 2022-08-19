import { IndexProps } from "../utils/types";
import { NextPage } from "next";
import Account from "../components/Profile";

const Profile: NextPage<IndexProps> = (props: IndexProps) => {
  return (
    <Account
      username={props?.user?.username}
      previousScores={props?.user?.previousScores}
    />
  );
};
export default Profile;
