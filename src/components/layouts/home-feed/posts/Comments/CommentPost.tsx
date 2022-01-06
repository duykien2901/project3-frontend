import { Formik } from "formik";
import { FormItem, Input } from "formik-antd";
import React from "react";
import { useSelector } from "react-redux";
import AvatarBase from "src/components/base/avatar/Avatar";
import { userSelector } from "src/ducks/user/selector";
import { CommemtWrapper } from "./style";

const CommentPost: React.FC = () => {
  const { loggedUser } = useSelector(userSelector);
  return (
    <CommemtWrapper>
      <div className="comment-input">
        <AvatarBase user={loggedUser} size={35} />
        <Formik
          initialValues={{ content: "" }}
          onSubmit={(values) => {
            console.log("ss");
          }}
        >
          {({ submitForm }) => {
            return (
              <div className="input-wrapper">
                <FormItem name="content">
                  <Input
                    bordered={false}
                    size="large"
                    name="content"
                    placeholder="Viết bình luận"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        submitForm();
                      }
                    }}
                  />
                </FormItem>
              </div>
            );
          }}
        </Formik>
      </div>
    </CommemtWrapper>
  );
};

export default CommentPost;
