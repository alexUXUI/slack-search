import React, { RefObject, SetStateAction } from 'react';
import Select, { components, OptionProps } from 'react-select';
import StateManager from 'react-select';
import { UserState } from './RandomUser.types';

const CustomOption = (props: OptionProps<UserState>): JSX.Element => {
  const { data } = props;
  return data && (
    <components.Option {...props} className="search-result">
      <div className="content--left">
        <img src={data.picture.thumbnail} alt="user image" /> 
      </div>
      <div className="content--right">
        <div>{data.name.first} {data.name.last}</div>
        <div>{data.cell}</div>
      </div>
    </components.Option>
  )
};

interface SearchProps {
  options: UserState[],
  setSelectedUser: React.Dispatch<SetStateAction<UserState | undefined>>
  loading: boolean
}

export function Search(props: SearchProps): JSX.Element {

  const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>(false)
  const select = React.useRef<HTMLInputElement>(null)

  return (
    <div className="search__wrapper">
      <Select
        className="search"
        ref={select as unknown as RefObject<StateManager<any, any>>}
        defaultValue={{ 
          'label': 'search by name', 
          value: 'nothing' 
        } as UserState}
        isClearable
        isLoading={props.loading}
        menuIsOpen={menuIsOpen}
        options={props.options}
        openMenuOnFocus={false}
        openMenuOnClick={false}
        NoOptionsMessage="No results were found"
        onChange={(change) => props.setSelectedUser(change as UserState)}
        components={{
          DropdownIndicator: null,
          ClearIndicator: null,
          Option: CustomOption
        }}
        onInputChange={(change: string, event: { action: string }): void => {
          console.log(event)
          return change.length >= 3
            ? setMenuIsOpen(true)
            : setMenuIsOpen(false)
        }}
      />
    </div>
  );
}