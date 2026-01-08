import "./FlashMessage.css";

type Props = {
  message: string;
  type: "sucess" | "error";
};

export default function FlashMessage({ message, type }: Props) {
  if (!message) return null;

  return (
    <div className={`flash-message ${type}`}>
      {message}
    </div>
  );
}