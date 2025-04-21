// מבחן רשתות - גרסה עם Bootstrap בעיצוב כחול-לבן וממורכז
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // במידה ותרצי להוסיף התאמות ידניות

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const rawQuestions = [
    { question: "מה זה BGP?", correct: "פרוטוקול ניתוב בין ספקי אינטרנט", options: ["שירות DNS", "פרוטוקול ניתוב בין ספקי אינטרנט", "אמצעי אבטחה", "שכבת רשת"] },
    { question: "מה זה NAT Static?", correct: "שידוך קבוע בין כתובת IP פנימית לחיצונית", options: ["שידוך משתנה לפי עומס", "שידוך קבוע בין כתובת IP פנימית לחיצונית", "חסימת פורטים", "DNS פרטי"] },
    { question: "מה זה QOS?", correct: "ניהול עדיפויות של תעבורה ברשת", options: ["בדיקת יציבות רשת", "ניהול כתובות DNS", "ניהול עדיפויות של תעבורה ברשת", "בדיקת פורטים"] },
    { question: "מה זה IDS?", correct: "מערכת לגילוי חדירות לרשת", options: ["VPN פנימי", "מערכת לגילוי חדירות לרשת", "שרת DNS חכם", "ראוטר מוגבר"] },
    { question: "מה זה ICMP?", correct: "פרוטוקול המשמש לשליחת הודעות שגיאה ובקרה ברשת", options: ["שיטת קידוד", "פרוטוקול המשמש לשליחת הודעות שגיאה ובקרה ברשת", "סוג של אנטנה", "מערכת DNS"] },
    { question: "מה זה IP?", correct: "כתובת מזהה לכל מכשיר ברשת", options: ["כתובת דוא\"ל", "כתובת פיזית של כבל", "כתובת מזהה לכל מכשיר ברשת", "שם משתמש ברשת"] },
    { question: "מה תפקידו של ראוטר?", correct: "לחבר בין רשתות שונות", options: ["לחבר בין רשתות שונות", "לאחסן קבצים", "לפקח על מהירות אינטרנט", "לשלוח הודעות SMS"] },
    { question: "מה עושה פורט 443?", correct: "SSL / HTTPS", options: ["SSL / HTTPS", "FTP", "SSH", "DNS"] },
    { question: "מה זה OSPF?", correct: "פרוטוקול ניתוב פנימי בין ראוטרים", options: ["סוג של כתובת MAC", "אמצעי לשמירת סיסמאות", "פרוטוקול ניתוב פנימי בין ראוטרים", "שירות DNS מתקדם"] },
    { question: "מה זה NAT?", correct: "מנגנון שמתרגם בין כתובות IP פנימיות לחיצוניות", options: ["שירות להצפנה", "כתובת קבועה למודם", "כלי לאחסון DNS", "מנגנון שמתרגם בין כתובות IP פנימיות לחיצוניות"] },
    { question: "מה ההבדל בין TCP ל-UDP?", correct: "TCP כולל בקרת זרימה ואמינות, UDP מהיר אך ללא בדיקה", options: ["TCP כולל בקרת זרימה ואמינות, UDP מהיר אך ללא בדיקה", "UDP מוצפן יותר", "TCP מהיר יותר", "אין הבדל"] },
    { question: "מה זה VLAN?", correct: "מחלק את הרשת הלוגית לפי קבוצות משתמשים בלי קשר למיקום פיזי", options: ["מחלק את הרשת הלוגית לפי קבוצות משתמשים בלי קשר למיקום פיזי", "מגביר את מהירות הרשת", "פותח פורטים אוטומטית", "מקצה כתובות MAC אוטומטית"] },
    { question: "מה זה Default Gateway?", correct: "שער יציאה מהרשת המקומית ליעדים חיצוניים", options: ["שער יציאה מהרשת המקומית ליעדים חיצוניים", "כתובת DNS מקומית", "חומת אש פנימית", "הנתב של ספק האינטרנט"] },
    { question: "מה זה כתובת MAC?", correct: "כתובת פיזית ייחודית לכל כרטיס רשת, מזוהה לפי יצרן ומספר סידורי", options: ["כתובת זמנית של ראוטר", "כתובת פיזית ייחודית לכל כרטיס רשת, מזוהה לפי יצרן ומספר סידורי", "כתובת דוא\"ל מוצפנת", "שם משתמש ברשת פנימית"] },
    { question: "מה זה ping?", correct: "שליחת אות לבדיקת זמינות של כתובת ברשת", options: ["בדיקת מהירות WiFi", "שליחת אות לבדיקת זמינות של כתובת ברשת", "כלי לשכפול מנות", "פרוטוקול ברשת LAN"] },
    { question: "מה זה HTTPS?", correct: "פרוטוקול מאובטח להעברת מידע", options: ["פרוטוקול רגיל לדפדפנים", "פרוטוקול גיבוי של DNS", "פרוטוקול מאובטח להעברת מידע", "כתובת IP זמנית"] },
    { question: "מה ההבדל בין כתובת דינמית לסטטית?", correct: "דינמית משתנה על ידי DHCP, סטטית מוגדרת ידנית", options: ["סטטית מוצפנת, דינמית פתוחה", "אין הבדל", "דינמית משתנה על ידי DHCP, סטטית מוגדרת ידנית", "סטטית מגיעה מספק"] },
    { question: "מה זה firewall מבוסס חומרה?", correct: "מכשיר פיזי שמסנן תעבורה", options: ["שרת DNS פנימי", "כרטיס רשת", "מכשיר פיזי שמסנן תעבורה", "תוכנת אבטחה לענן"] },
    { question: "מה זה DHCP?", correct: "פרוטוקול שמקצה כתובות IP אוטומטית", options: ["פרוטוקול להצפנת דוא\"ל", "שירות אחסון קבצים", "פרוטוקול שמקצה כתובות IP אוטומטית", "בדיקת DNS"] },
    { question: "מה זה DNS poisoning?", correct: "הטעיה של שרתי DNS לצורך הפניית משתמשים לשרתים מזויפים", options: ["הצפנה של שרתים", "חסימת פורטים", "הטעיה של שרתי DNS לצורך הפניית משתמשים לשרתים מזויפים", "בדיקת עומסים"] },
    { question: "מה זה VPN?", correct: "רשת פרטית וירטואלית המאפשרת חיבור מוצפן", options: ["רשת קווית בלבד", "שירות DNS", "רשת פרטית וירטואלית המאפשרת חיבור מוצפן", "כתובת MAC ציבורית"] },
    { question: "מה זה spoofing?", correct: "התחזות לכתובת אחרת ברשת", options: ["שידור פתוח ברשת אלחוטית", "הצפנת כתובות דינמית", "התחזות לכתובת אחרת ברשת", "פתיחת כל הפורטים בבת אחת"] },
    { question: "מה זה Bandwidth?", correct: "רוחב הפס של קצב העברת הנתונים", options: ["גובה אנטנה", "רוחב של ראוטר", "רוחב הפס של קצב העברת הנתונים", "קיבולת של דיסק"] },
    { question: "מה זה packet loss?", correct: "אובדן של חלק מהמידע במהלך השידור", options: ["סיום שידור תקין", "חיבור זמני בלבד", "אובדן של חלק מהמידע במהלך השידור", "הצפנת DNS"] },
    { question: "מה זה Traceroute?", correct: "כלי למציאת המסלול שפקודה עוברת באינטרנט", options: ["בדיקת DNS", "פתרון תקלות במודם", "כלי למציאת המסלול שפקודה עוברת באינטרנט", "ניתוב MAC"] },
    { question: "מה זה כתובת loopback?", correct: "127.0.0.1 – בדיקת תקשורת מקומית של המחשב עם עצמו", options: ["כתובת שרת DNS", "127.0.0.1 – בדיקת תקשורת מקומית של המחשב עם עצמו", "כתובת IP דינמית", "כתובת של DHCP"] },
    { question: "מה זה כתובת broadcast?", correct: "כתובת לשליחה לכל המארחים ברשת", options: ["כתובת לשליחה לכל המארחים ברשת", "כתובת DNS", "כתובת שמזהה רק שרתים", "כתובת פנימית של סוויץ'"] },
    { question: "מה ההבדל בין סוויץ' להאב?", correct: "סוויץ' חכם יותר, שולח מידע רק ליעד הרלוונטי", options: ["האב הוא אלחוטי", "סוויץ' איטי יותר", "סוויץ' חכם יותר, שולח מידע רק ליעד הרלוונטי", "אין הבדל"] },
    { question: "מה זה Proxy?", correct: "שרת שמתווך בין משתמש לשרת אחר", options: ["שרת DNS פנימי", "מכשיר פיזי לניטור", "שרת שמתווך בין משתמש לשרת אחר", "תוכנת אנטי וירוס"] },
    { question: "מה זה FTP?", correct: "פרוטוקול להעברת קבצים בין מחשבים ברשת", options: ["שירות DNS מהיר", "פרוטוקול להצפנת סיסמאות", "פרוטוקול להעברת קבצים בין מחשבים ברשת", "כלי למעקב אחרי תעבורה"] },
    { question: "מה זה TTL?", correct: "מספר הקפיצות המרבי שהחבילה יכולה לעבור ברשת", options: ["פורמט של MAC", "מספר הקפיצות המרבי שהחבילה יכולה לעבור ברשת", "כתובת פיזית של הנתב", "קידוד של מנות"] },
    { question: "מה זה switch layer 3?", correct: "סוויץ' עם יכולת ניתוב IP בין רשתות", options: ["סוויץ' אלחוטי", "סוויץ' של רמת DNS", "סוויץ' עם יכולת ניתוב IP בין רשתות", "סוויץ' רק ל-WiFi"] },
    { question: "מהו פינג (ping) גבוה?", correct: "מעיד על חיבור איטי או לא יציב", options: ["מעיד על חיבור יציב", "מעיד על כתובת סטטית", "מעיד על חיבור איטי או לא יציב", "לא משפיע על הביצועים"] },
    { question: "מה ההבדל בין IPv4 ל-IPv6?", correct: "IPv4 הוא 32 ביט ו-IPv6 הוא 128 ביט", options: ["IPv6 איטי יותר", "IPv4 תומך ביותר מכשירים", "אין הבדל מעשי", "IPv4 הוא 32 ביט ו-IPv6 הוא 128 ביט"] },
    { question: "מה זה SSL certificate?", correct: "תעודת אבטחה לאתרים לצורך הצפנה", options: ["כתובת MAC מוצפנת", "DNS פנימי", "תעודת אבטחה לאתרים לצורך הצפנה", "VPN דינמי"] },
    { question: "מה זה port 22?", correct: "SSH", options: ["FTP", "SSH", "SMTP", "DNS"] },
    { question: "מה זה port 53?", correct: "DNS", options: ["HTTPS", "SSH", "DNS", "FTP"] },
    { question: "מה זה load balancing?", correct: "חלוקת עומסים בין שרתים או קווים שונים", options: ["חיבור לשרת יחיד", "שכפול DNS", "חסימת תעבורה לא מאובטחת", "חלוקת עומסים בין שרתים או קווים שונים"] },
    { question: "מה זה port forwarding?", correct: "הפניית תעבורה חיצונית לכתובת פנימית מסוימת", options: ["חסימת כתובות IP", "הצפנה של כתובות", "הפניית תעבורה חיצונית לכתובת פנימית מסוימת", "שינוי MAC address"] },
    { question: "מה זה כתובת IPv6?", correct: "כתובת IP בפורמט חדש עם תמיכה בכמות עצומה של כתובות", options: ["כתובת מוצפנת מקומית", "פורמט IP לגיבוי בלבד", "כתובת IP בפורמט חדש עם תמיכה בכמות עצומה של כתובות", "כתובת של firewall"] }
    
    
    ,
    { question: "מה זה PAT (Port Address Translation)?", correct: "שימוש באותה כתובת IP ציבורית עבור מספר מכשירים על ידי שינוי הפורטים", options: ["שימוש באותה כתובת IP ציבורית עבור מספר מכשירים על ידי שינוי הפורטים", "מיפוי DNS ל-IP", "הצפנת כתובות MAC", "שכפול מנות"] },
    { question: "מה המשמעות של MAC ולפי מה קוראים אותו?", correct: "כתובת פיזית ייחודית המוקצת על ידי יצרן כרטיס הרשת", options: ["כתובת הניתנת אקראית", "כתובת סטטית שמוזנת ידנית", "כתובת פיזית ייחודית המוקצת על ידי יצרן כרטיס הרשת", "שם משתמש ברשת"] },
    { question: "כמה רשתות IP קיימות ולמה יש IPv6?", correct: "IPv6 נועד לפתור את מגבלת כמות הכתובות ב-IPv4", options: ["IPv4 מספיק לכולם", "IPv6 מאובטח יותר בלבד", "IPv6 נועד לפתור את מגבלת כמות הכתובות ב-IPv4", "IPv6 הוא רק לארגונים"] },
    { question: "איך עובד Subnet?", correct: "חלוקה של רשת IP לתת-רשתות לפי מסכת רשת", options: ["חלוקה לפי פורטים", "הפרדת ראוטרים", "חלוקה של רשת IP לתת-רשתות לפי מסכת רשת", "איחוד בין רשתות"] },
    { question: "מה תפקידו של פרוטוקול ARP?", correct: "לתרגם בין כתובת IP לכתובת MAC", options: ["לשלוח פינג", "להצפין מידע", "לתרגם בין כתובת IP לכתובת MAC", "להפעיל DNS"] },
    { question: "מה זה SSID?", correct: "שם הרשת האלחוטית כפי שהוא מופיע למשתמשים", options: ["סיסמה של הנתב", "IP של הנתב", "שם הרשת האלחוטית כפי שהוא מופיע למשתמשים", "MAC של נקודת גישה"] },
    { question: "מהו תדר 2.4GHz לעומת 5GHz ב-WiFi?", correct: "2.4GHz טווח רחב יותר, 5GHz מהיר אך עם טווח קצר יותר", options: ["2.4GHz תמיד טוב יותר", "5GHz חוסם VPN", "2.4GHz טווח רחב יותר, 5GHz מהיר אך עם טווח קצר יותר", "שניהם זהים"] },
    { question: "מה זה MTU?", correct: "גודל מקסימלי של מנות שניתן לשלוח ברשת", options: ["גודל זיכרון של מודם", "פרוטוקול DNS", "גודל מקסימלי של מנות שניתן לשלוח ברשת", "כמות המשתמשים ברשת"] },
    { question: "מה זה Port Scanning?", correct: "בדיקה אילו פורטים פתוחים בכתובת מסוימת", options: ["שכפול כתובות", "בדיקה אילו פורטים פתוחים בכתובת מסוימת", "חסימת תעבורה", "סנכרון DNS"] },
    { question: "מה ההבדל בין סוויץ' מנוהל ללא מנוהל?", correct: "מנוהל מאפשר הגדרות כמו VLAN ו-QoS, לא מנוהל פשוט מעביר תעבורה", options: ["לא מנוהל מהיר יותר", "אין הבדל אמיתי", "מנוהל מאפשר הגדרות כמו VLAN ו-QoS, לא מנוהל פשוט מעביר תעבורה", "מנוהל הוא נתב"] }
];
const questions = rawQuestions.map((q) => {
    const shuffled = shuffle(q.options);
    return {
        question: q.question,
        options: shuffled,
        answer: shuffled.indexOf(q.correct)
    };
});

export default function NetworkQuiz() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [reveal, setReveal] = useState(false);
    
    const handleAnswer = (index) => {
        const correct = index === questions[current].answer;
        setAnswers([...answers, { question: questions[current].question, selected: index, correct: questions[current].answer }]);
        if (correct) setScore(score + 2);
        const next = current + 1;
        if (next < questions.length) {
            setCurrent(next);
        } else {
            setShowScore(true);
        }
    };
    
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container p-4 rounded shadow bg-white text-dark" style={{ maxWidth: "700px" }}>
                <h1 className="text-center mb-4 text-primary">מבחן רשתות - iPractiCom</h1>
                {showScore ? (
                    <div className="text-center">
                        <p className="h4">סיימת את המבחן!</p>
                        {!reveal ? (
                            <button
                                onClick={() => setReveal(true)}
                                className="btn btn-success mt-3"
                            >
                                קרא לבוחן
                            </button>
                        ) : (
                            <div className="mt-4 text-end">
                                <p className={`h5 ${score / (questions.length * 2) >= 0.9 ? 'text-success' : score / (questions.length * 2) >= 0.7 ? 'text-warning' : 'text-danger'}`}>
                                    הציון שלך: {score} מתוך {questions.length * 2} ({Math.round((score / (questions.length * 2)) * 100)}%)
                                </p>
                                {answers.map((ans, i) => (
                                    <div key={i} className="mb-3 p-3 border rounded bg-light-subtle">
                                        <p className="fw-bold">{i + 1}. {ans.question}</p>
                                        <p>התשובה שלך: {String.fromCharCode(1488 + ans.selected)} - {questions[i].options[ans.selected]}</p>
                                        <p className="text-success">התשובה הנכונה: {String.fromCharCode(1488 + ans.correct)} - {questions[i].options[ans.correct]}</p>
                                        <p className={ans.selected === ans.correct ? "text-success" : "text-danger"}>
                                            {ans.selected === ans.correct ? "✔ תשובה נכונה" : "✘ תשובה שגויה"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <p className="fs-5 text-end mb-3">
                            <strong>שאלה {current + 1} מתוך {questions.length}:</strong> {questions[current]?.question}
                        </p>
                        <div className="d-grid gap-2">
                            {questions[current]?.options.map((opt, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className="btn btn-outline-primary text-end"
                                >
                                    {String.fromCharCode(1488 + index)}. {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
