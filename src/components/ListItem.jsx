/* eslint-disable react/prop-types */

const ListItem = ({
  item,
  handleAction,
  handleCheck,
  checkboxHidden,
  icon: Icon,
}) => {
  return (
    // <ul className="list">
    //   {items.map((item) => (
    <li className="item" key={item.id}>
      <label style={item.checked ? { textDecoration: "line-through" } : null}>
        {item.name}
      </label>
      {item.price !== undefined && <span>${item.price.toFixed(2)}</span>}
      {!checkboxHidden && (
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => handleCheck(item.id)}
        />
      )}
      <Icon
        className="icon"
        role="button"
        onClick={() => handleAction(item.id)}
      />
    </li>
  );
};
//     </ul>
//   );
// };

export default ListItem;
