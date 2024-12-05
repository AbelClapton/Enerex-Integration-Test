import Filter from "components/Filter/Filter";
import { useSearchParams } from "react-router-dom";
import "./TableHeader.css";

const TableHeader = ({ name, children, ...props }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderBy = searchParams.get("orderBy");
  const asc = searchParams.get("asc") === "true";
  const selected = orderBy === name;

  const onSort = () => {
    const newParams = new URLSearchParams(searchParams);

    if (selected) {
      if (asc) {
        newParams.set("asc", false);
      } else {
        newParams.delete("orderBy");
        newParams.delete("asc");
      }
    } else {
      newParams.set("orderBy", name);
      newParams.set("asc", true);
    }

    setSearchParams(newParams);
  };

  return (
    <th scope="col" style={{ cursor: "pointer" }} onClick={onSort} {...props}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {children}

          {selected && (
            <i
              className="fa fa-arrow-up"
              style={{ rotate: !asc ? "180deg" : "0deg", marginLeft: 8 }}
            />
          )}
        </div>

        <Filter name={name} label={children} />
      </div>
    </th>
  );
};

export default TableHeader;
