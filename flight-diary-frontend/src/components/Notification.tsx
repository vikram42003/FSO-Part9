interface NotificationProps {
  text: string | null;
}

const Notification = ({ text }: NotificationProps) => {
  const style = {
    color: "red",
  };

  return <div style={style}>{text}</div>;
};

export default Notification;
