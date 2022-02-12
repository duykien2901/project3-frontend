import { Avatar } from "antd";
import { MentionSearch } from "src/ducks/home/post/mentions/hook";
import { User } from "src/ducks/user";
import { AvatarWrapper } from "./avatar.style";

type Props = {
  size?: number;
  user?: User | MentionSearch | null;
};
const AvatarBase: React.FC<Props> = ({ size, user }) => {
  return (
    <AvatarWrapper>
      <Avatar src={user?.profileImage} size={size}>
        {user?.name?.charAt(0).toUpperCase()}
      </Avatar>
    </AvatarWrapper>
  );
};

export default AvatarBase;
