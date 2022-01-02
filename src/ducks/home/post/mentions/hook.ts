import { notification } from "antd";
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { API_ENDPOINTS } from "src/constants/commom.constant";
import axios from "src/services";

export type MentionSearch = {
  userId: string;
  name: string;
  profileImage?: string;
};
const useMentions = () => {
  const [mentions, setMentions] = useState<MentionSearch[]>([]);
  const [mentionSearch, setMentionSearch] = useState<MentionSearch[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const deboundSearchUser = useMemo(
    () =>
      debounce(async (text: string) => {
        try {
          const {
            data: { users },
          } = await axios.get(`${API_ENDPOINTS.USER}?name=${text}`);
          setMentionSearch(users);
          setLoading(false);
        } catch (error: any) {
          notification.error({
            message: error.messsage,
            duration: 2,
          });
          setLoading(false);
        }
      }, 1000),
    []
  );

  const handleSearchMentions = useCallback(
    (text: string) => {
      setLoading(true);
      deboundSearchUser(text);
    },
    [deboundSearchUser]
  );

  const handleSetMentions = useCallback(
    (item: MentionSearch) => {
      setMentions([...mentions, item]);
    },
    [mentions]
  );

  const cutStringContent = useCallback(
    (content: string) => {
      let cloneMentions = [...mentions];
      let change: boolean = false;
      mentions.forEach((mention, index) => {
        const indexMention = content.indexOf(
          `@${mention.name.replace(/\s/g, "")}`
        );
        if (indexMention === -1) {
          cloneMentions.splice(index, 1);
          change = true;
        } else {
          content = content.substring(indexMention + mention.name.length);
        }
      });
      change && setMentions(cloneMentions);
    },
    [mentions]
  );

  return {
    mentions,
    setMentions,
    handleSearchMentions,
    mentionSearch,
    loading,
    handleSetMentions,
    cutStringContent,
  };
};

export default useMentions;
