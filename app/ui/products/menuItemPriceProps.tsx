import { Size } from '@/app/lib/definitions';
import ChevronDown from '@/components/icons/ChevronDown';
import ChevronUp from '@/components/icons/ChevronUp';
import Plus from '@/components/icons/Plus';
import Trash from '@/components/icons/Trash';
import { PlusIcon } from '@heroicons/react/20/solid';
import { ChangeEvent } from 'react';

export default function MenuItemPriceProps({
  // name,
  addLabel,
  props,
  setProps,
}: {
  // name: string;
  addLabel: string;
  props: Size[];
  setProps: any;
}) {
  

  function addProp() {
    setProps((oldProps: any) => {
      return [...oldProps, { name: '', price: 0 }];
    });
  }

  function editProp(
    ev: ChangeEvent<HTMLInputElement>,
    index: number,
    prop: string,
  ) {
    const newValue = ev.target.value;
    setProps((prevSizes: any) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove: number) {
    setProps((prev: Size[]) =>
      prev.filter((v, index) => index !== indexToRemove),
    );
  }

  return (
    <div className="mb-3 block text-black dark:text-white">
      {/* <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex justify-start border-0 p-1"
        type="button"
      > */}
        
        {/* <span>{name}</span>
        <span>({props?.length})</span>
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />} */}
      {/* </button> */}
      <div>
        {props?.length > 0 &&
          props.map((size: Size, index: number) => (
            <div key={index} className="flex items-end gap-2">
              <div>
                <label>Nombre</label>
                <input
                  id={'name_' + index}
                  name={'name_' + index}
                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editProp(ev, index, 'name')}
                />
              </div>
              <div>
                <label>Precio Extra</label>
                <input
                id={'price_'+index}
                name={'price_'+index}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  type="number"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(ev) => editProp(ev, index, 'price')}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="mb-2 bg-transparent px-2 py-2"

                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
        //   className="items-center bg-white dark:bg-black"
          className="flex justify-center rounded bg-meta-3 px-6 py-2 mt-2 font-medium text-gray hover:bg-opacity-95"
        >
          {/* <Plus className="h-4 w-4" /> */}
          <PlusIcon className="h-5 md:ml-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
