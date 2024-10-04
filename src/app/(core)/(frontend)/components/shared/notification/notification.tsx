import CheckIcon from "../icon/check-icon";

interface ToastProps {
    visible: boolean;
    icon: React.ReactNode;
  }
  
const Notification: React.FC<ToastProps> = ({  visible, icon}) => {
    return (
        <div
        className={`fixed bottom-4 right-4 bg-green-500 w-[40px] h-[40px] p-1
         rounded-full shadow-lg transition-opacity duration-300 ease-in-out ${
            visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        >
            {icon}
        </div>
    );
};

export default Notification;