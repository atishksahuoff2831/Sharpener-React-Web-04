import React, {useEffect, useState} from "react";
import {getDatabase, ref, onValue} from "firebase/database";
import "../Styles/Inbox.css";

const removeHTMLTags = (str) => {
    return str.replace(/<[^>]*>?/gm, '');
};

const Sent = () => {
    const useremail = localStorage.getItem("UserMail");
    const [sentMessages, setSentMessages] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const sentRef = ref(db, `MailClient/${useremail.replace('.', '')}/SentBox`);

        onValue(sentRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const sentMessages = Object.values(data);
                setSentMessages(sentMessages);
            }
        });
    }, [useremail]);

    return (
        <>
            <div className="ListDiv">
                <p className="LHD">{useremail}, This Is Your Sent Section.</p>
                <div className="LIST">
                    {sentMessages.map((message, index) => (
                        <div key={index} className="LL">
                            <p>To: {message.to}</p>
                            <p>Subject: {message.subject}</p>
                            <p>Message: {removeHTMLTags(message.emailtext)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Sent;