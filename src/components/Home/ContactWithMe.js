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
  
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addMessageStatus = useSelector(selectAddMessagesStatus);
  const addMessageErrors = useSelector(selectAddMessagesErrors);

  useEffect(() => {
    if (addMessageStatus === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (addMessageStatus === "succeeded") {
      setLocalContact({
        localName: "",
        localEmail: "",
        localTitle: "",
        localContent: "",
      });

      showToast(
        "success",
        "Message sent successfully. Thank you for reaching out. I will review your message and respond as soon as possible."
      );
    } else if (addMessageStatus === "failed") {
      showToast("error", addMessageErrors || "Failed to add message.");
    }
  }, [addMessageStatus, addMessageErrors]);

  const validateMessage = (message) => {
    // تحقق من عدم احتواء الرسالة على أكواد ضارة
    return !/<script|<\/script>/i.test(message);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    const { localName, localEmail, localTitle, localContent } = localContact;

    // التحقق من أن جميع الحقول مليئة
    const isFormValid = Object.values(localContact).every(field => field.trim() !== "");
    if (!isFormValid) {
      showToast("warn", "All fields are required");
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(localEmail)) {
      showToast("warn", "Invalid email format");
      return;
    }

    // تطهير المحتوى
    const cleanName = DOMPurify.sanitize(localName);
    const cleanEmail = DOMPurify.sanitize(localEmail);
    const cleanTitle = DOMPurify.sanitize(localTitle);
    const cleanContent = DOMPurify.sanitize(localContent);

    if (validateMessage(cleanContent)) {
      dispatch(
        addMessageThunk({
          SenderName: cleanName,
          senderEmail: cleanEmail,
          title: cleanTitle,
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
        <button type="submit" className="contact-send" disabled={loading}>
          {loading ? "Sending..." : <i className="fa-solid fa-paper-plane Contact-color-icon"></i>}
        </button>
      </form>
    </div>
  );
};

export default ContactWithMe;
