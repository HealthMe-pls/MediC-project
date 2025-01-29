import { useState, useEffect } from "react";
import { ShopCategory } from "@/utility/shopcate";

interface FilterProps {
  shopCategory: ShopCategory[];
  selectedCate: number;
  onSelectCategory: (categoryId: number) => void;
  setMatchShopID: React.Dispatch<React.SetStateAction<number>>;
}

const Filter: React.FC<FilterProps> = ({
  shopCategory,
  selectedCate,
  onSelectCategory,
  setMatchShopID,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tempCate, setTempCate] = useState(selectedCate);

  // Update tempCate when selectedCate changes
  useEffect(() => {
    setTempCate(selectedCate);
  }, [selectedCate]);

  // Toggle modal visibility
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    onSelectCategory(tempCate); // Call the parent function to update the selected category
    setMatchShopID(0);
    closeModal(); // Close the modal after submission
  };

  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="mb-6 mt-2">
      <div className="sm:hidden">
        {/* Filter Button */}
        <div className="mb-6 mt-2">
          {/* Filter Button */}
          <div className="flex items-center space-x-4">
            <button
              className="bg-[#FFFFFF] w-[89px] h-[35px] px-4 text-[#929292] text-light rounded-[30px] flex items-center"
              onClick={toggleModal} // Open modal
            >
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 mr-[54x]"
              >
                <path
                  d="M17.0156 0.869521C16.9194 0.647264 16.76 0.45819 16.5572 0.325814C16.3544 0.193438 16.1172 0.123601 15.875 0.12499H2.12498C1.88305 0.125466 1.64646 0.196138 1.4439 0.328432C1.24135 0.460726 1.08154 0.648957 0.98386 0.87029C0.886179 1.09162 0.854826 1.33655 0.893604 1.57535C0.932382 1.81415 1.03963 2.03656 1.20232 2.21561L1.20857 2.22265L6.49998 7.87265V13.875C6.49993 14.1012 6.56127 14.3232 6.67747 14.5173C6.79368 14.7114 6.96038 14.8704 7.15981 14.9772C7.35924 15.084 7.58392 15.1347 7.8099 15.1238C8.03587 15.113 8.25466 15.041 8.44295 14.9156L10.9429 13.2484C11.1143 13.1343 11.2548 12.9795 11.352 12.798C11.4492 12.6165 11.5 12.4137 11.5 12.2078V7.87265L16.7922 2.22265L16.7984 2.21561C16.9628 2.03738 17.0711 1.81467 17.1097 1.57528C17.1484 1.33589 17.1156 1.09042 17.0156 0.869521ZM10.4203 7.20155C10.3122 7.31618 10.2513 7.46742 10.25 7.62499V12.2078L7.74998 13.875V7.62499C7.75003 7.46628 7.6897 7.3135 7.58123 7.19765L2.12498 1.37499H15.875L10.4203 7.20155Z"
                  fill="#929292"
                />
              </svg>
              <p className="text-[18px] font-light flex items-center">Filter</p>
            </button>
            <p className="mt-4 mb-4 text-[#4C4343]">
              Selected Category :{" "}
              {selectedCate !== 0
                ? shopCategory.find((category) => category.id === selectedCate)
                    ?.name
                : "All"}
            </p>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
              <h2 className="text-[18px]-[#4C4343] mb-4">
                Select your preferred category
              </h2>

              {/* ตัวเลือกแบบปุ่ม */}
              <div className="space-y-4 mb-6">
                {/* ตัวเลือก All */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    className="form-radio h-5 w-5 checked:bg-[#4C4343] checked:ring-[#4C4343] focus:ring-[#4C4343]"
                    checked={tempCate === 0}
                    onChange={() => setTempCate(0)} // เปลี่ยนค่า tempCate แทน
                  />
                  <span className="text-gray-800">All</span>
                </label>

                {/* ตัวเลือกจาก shopCategory */}
                {shopCategory.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      className="form-radio h-5 w-5 checked:bg-[#4C4343] checked:ring-[#4C4343] focus:ring-[#4C4343]"
                      checked={tempCate === category.id} // ไฮไลท์รายการที่ตรงกับ tempCate
                      onChange={() => setTempCate(category.id)} // เปลี่ยนค่า tempCate แทน
                    />
                    <span className="text-gray-800">{category.name}</span>
                  </label>
                ))}
              </div>

              {/* ปุ่มยืนยันและปิด Modal */}
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={closeModal} // ปิด Modal
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleSubmit}
                  disabled={tempCate === null}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="hidden sm:flex flex-row items-center p-4 bg-white w-[280px] h-[50px] rounded-[25px]">
        {/* Icon */}
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 mr-2"
        >
          <path
            d="M17.0156 0.869521C16.9194 0.647264 16.76 0.45819 16.5572 0.325814C16.3544 0.193438 16.1172 0.123601 15.875 0.12499H2.12498C1.88305 0.125466 1.64646 0.196138 1.4439 0.328432C1.24135 0.460726 1.08154 0.648957 0.98386 0.87029C0.886179 1.09162 0.854826 1.33655 0.893604 1.57535C0.932382 1.81415 1.03963 2.03656 1.20232 2.21561L1.20857 2.22265L6.49998 7.87265V13.875C6.49993 14.1012 6.56127 14.3232 6.67747 14.5173C6.79368 14.7114 6.96038 14.8704 7.15981 14.9772C7.35924 15.084 7.58392 15.1347 7.8099 15.1238C8.03587 15.113 8.25466 15.041 8.44295 14.9156L10.9429 13.2484C11.1143 13.1343 11.2548 12.9795 11.352 12.798C11.4492 12.6165 11.5 12.4137 11.5 12.2078V7.87265L16.7922 2.22265L16.7984 2.21561C16.9628 2.03738 17.0711 1.81467 17.1097 1.57528C17.1484 1.33589 17.1156 1.09042 17.0156 0.869521ZM10.4203 7.20155C10.3122 7.31618 10.2513 7.46742 10.25 7.62499V12.2078L7.74998 13.875V7.62499C7.75003 7.46628 7.6897 7.3135 7.58123 7.19765L2.12498 1.37499H15.875L10.4203 7.20155Z"
            fill="#929292"
          />
        </svg>

        {/* Filter Label */}
        <p className="text-[18px] font-light mr-2">Filter</p>

        {/* Dropdown */}
        <select
          id="categoryDropdown"
          value={selectedCate ?? ""}
          onChange={(e) => onSelectCategory(Number(e.target.value))}
          className="border p-2 rounded-[15px]"
        >
          <option value="0">All</option>
          {shopCategory.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
