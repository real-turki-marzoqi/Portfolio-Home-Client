import { useState, useEffect } from "react";
import { addMessageThunk } from "../../redux/features/messages/messagesThunk";
import {
  selectAddMessagesErrors,
  selectAddMessagesStatus,
} from "../../redux/features/messages/messagesSelectors";
import { useSelector, useDispatch } from "react-redux";
import showToast from "../costumToast";
import { ToastContainer } from "react-toastify";
import DOMPurify from "dompurify";

const ContactWithMe = () => {
  const [localContact, setLocalContact] = useState({
    localName: "",
    localEmail: "",
    localTitle: "",
    localContent: "",
  });

  const dispatch = useDispatch();
  const addMessageStatus = useSelector(selectAddMessagesStatus);
  const addMessageErrors = useSelector(selectAddMessagesErrors);

  useEffect(() => {
    if (addMessageStatus === "succeeded") {
      setLocalContact({
        localName: "",
        localEmail: "",
        localTitle: "",
        localContent: "",
      });

      showToast(
        "success",
        "Message sent successfully Thank you for reaching out. I will review your message and respond to you as soon as possible."
      );
    } else if (addMessageStatus === "failed") {
      showToast("error", addMessageErrors || "Failed to add message");
    }
  }, [addMessageStatus, addMessageErrors]);

  const validateMessage = (message) => {
    // تحقق من عدم احتواء الرسالة على أكواد ضارة
    return !/<script|<\/script>/i.test(message);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    const { localName, localEmail, localTitle, localContent } = localContact;

    if (!localName || !localEmail || !localTitle || !localContent) {
      showToast("warn", "All fields are required");
      return;
    }

    // تطهير المحتوى
    const cleanContent = DOMPurify.sanitize(localContent);

    if (validateMessage(cleanContent)) {
      dispatch(
        addMessageThunk({
          SenderName: localName,
          senderEmail: localEmail,
          title: localTitle,
          messageContent: cleanContent,
        })
      );
    } else {
      showToast("warn", "Message contains invalid content");
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <h4>
        Contact With Me <i className="fa-solid fa-envelope"></i>
      </h4>
      <form className="contact-form" onSubmit={handleSendMessage}>
        <input
          className="contact-input"
          type="text"
          placeholder="Name"
          value={localContact.localName}
          onChange={(e) =>
            setLocalContact({ ...localContact, localName: e.target.value })
          }
        />
        <input
          className="contact-input"
          type="email"
          placeholder="Email"
          value={localContact.localEmail}
          onChange={(e) =>
            setLocalContact({ ...localContact, localEmail: e.target.value })
          }
        />
        <input
          className="contact-input"
          type="text"
          placeholder="Message Title"
          value={localContact.localTitle}
          onChange={(e) =>
            setLocalContact({ ...localContact, localTitle: e.target.value })
          }
        />
        <textarea
          className="contact-input"
          placeholder="Message Content"
          value={localContact.localContent}
          onChange={(e) =>
            setLocalContact({ ...localContact, localContent: e.target.value })
          }
        />
        <button type="submit" className="contact-send">
          <i className="fa-solid fa-paper-plane Contact-color-icon"></i>
        </button>
      </form>
    </div>
  );
};

export default ContactWithMe;
