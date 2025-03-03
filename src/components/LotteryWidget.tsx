
interface LotteryWidgetProps {
  title: string;
  image: string;
  action: string;
}

const LotteryWidget = ({ title, image, action }: LotteryWidgetProps) => {
  return (
    <div className="overflow-hidden rounded-xl">
      <div className="relative aspect-[2/1] w-full">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 p-4 text-center text-white">
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105">
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LotteryWidget;
