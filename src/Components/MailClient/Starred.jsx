// import React, { useEffect, useState } from "react";
// import { getDatabase, ref, onValue } from "firebase/database";
// import "../Styles/Inbox.css";
// const removeHTMLTags = (str) => {
//     return str.replace(/<[^>]*>?/gm, '');
// };

// const Starred = () => {
//     const useremail = localStorage.getItem("UserMail");
//     const [starredMessages, setStarredMessages] = useState([]);

//     useEffect(() => {
//         const db = getDatabase();
//         const starredRef = ref(db, `MailClient/${useremail.replace('.', '')}/StarMessages`);

//         onValue(starredRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const starredMessages = Object.values(data);
//                 setStarredMessages(starredMessages);
//             }
//         });
//     }, [useremail]);

//     return (
//         <>
//             <div className="ListDiv">
//                 <p className="LHD">{useremail}, This Is Your Starred Section.</p>
//                 <div className="LIST">
//                     {starredMessages.map((message, index) => (
//                         <div key={index} className="LL">
//                             <p>From: {message.from}</p>
//                             <p>Subject: {message.subject}</p>
//                             <p>Message: {removeHTMLTags(message.emailtext)}</p>
//                             <button>Unstar</button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };
// export default Starred;
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import "../Styles/Inbox.css";

const removeHTMLTags = (str) => {
    return str.replace(/<[^>]*>?/gm, '');
};

const Starred = () => {
    const useremail = localStorage.getItem("UserMail");
    const [starredMessages, setStarredMessages] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const starredRef = ref(db, `MailClient/${useremail.replace('.', '')}/StarMessages`);

        onValue(starredRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const starredMessages = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setStarredMessages(starredMessages);
            }
        });
    }, [useremail]);

    const handleUnstar = (id) => {
        const db = getDatabase();
        const starredMessageRef = ref(db, `MailClient/${useremail.replace('.', '')}/StarMessages/${id}`);
        remove(starredMessageRef);
        setStarredMessages(starredMessages.filter(message => message.id !== id));
    };

    return (
        <>
            <div className="ListDiv">
                <p className="LHD">{useremail}, This Is Your Starred Section.</p>
                <div className="LIST">
                    {starredMessages.map((message, index) => (
                        <div key={index} className="LL">
                            <p>From: {message.from}</p>
                            <p>Subject: {message.subject}</p>
                            <p>Message: {removeHTMLTags(message.emailtext)}</p>
                            <button onClick={() => handleUnstar(message.id)}>Unstar</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Starred;