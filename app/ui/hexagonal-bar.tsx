export default function HexagonalBar({selected, onSelect}) {
    const labels = ['局部地图','高德地图'];

    return (
        <div className="relative flex inset-0 items-start justify-start">

        {/* 按钮 */}
        <div className="relative flex h-10 justify-around">
            {labels.map((label, index) => (
            <HexagonalBarButton
                key={index}
                label={label}
                index={index}
                selected={selected}
                onClick={onSelect}
            />
            ))}
        </div>
        </div>
    );
}

function HexagonalBarButton({ label, index, selected, onClick }) {
    const isSelected = selected === index;

  return (
    <div
      className={`relative z-10 px-2 py-2 cursor-pointer transition-colors duration-3000 justify-center
      ${isSelected ? 'text-black' : 'text-gray-500'} 
      ${isSelected ? 'font-semibold' : 'font-normal'}`}
      onClick={() => onClick(index)}
    >
      <span className="relative z-20">{label}</span>
      {isSelected && (
        <div className="absolute inset-0 rounded-lg border-2 border-blue-500"></div>
      )}
    </div>
  );
}