import { Avatar } from "antd";
import { User } from "src/ducks/user";
import { AvatarWrapper } from "./avatar.style";

type Props = {
  size?: number;
  user?: User | null;
};
const AvatarBase: React.FC<Props> = ({ size, user }) => {
  return (
    <AvatarWrapper>
      <Avatar src={user?.profileImage} size={size}>
        {user?.name.charAt(0).toUpperCase()}
      </Avatar>
    </AvatarWrapper>
  );
};

export default AvatarBase;
