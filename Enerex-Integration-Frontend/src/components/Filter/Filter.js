import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Button,
  Card,
  CardTitle,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Input,
} from "reactstrap";

const Filter = ({ name, label }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");

  const onFilter = () => {
    if (search) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(name, search);
      setSearchParams(newParams);
    }
    setShowFilter(false);
  };

  const onReset = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(name);
    setSearchParams(newParams);
    setSearch("");
    setShowFilter(false);
  };

  useEffect(() => {
    const initialValue = searchParams.get(name);
    if (initialValue) setSearch(initialValue);
  }, [searchParams]);

  return (
    <Dropdown
      isOpen={showFilter}
      toggle={() => setShowFilter((prev) => !prev)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <DropdownToggle
        className="btn-icon-only text-light"
        href="#pablo"
        onClick={(e) => e.preventDefault()}
        size="sm"
        style={{ boxShadow: "none", borderRadius: 100 }}
      >
        <i
          className="fa fa-filter"
          style={{ color: search ? "#5e72e4" : "" }}
        />
      </DropdownToggle>

      <DropdownMenu
        className="dropdown-menu-arrow"
        right
        style={{ padding: 0 }}
      >
        <Card style={{ cursor: "default" }}>
          <div style={{ padding: "0.5rem" }}>
            <CardTitle>Name</CardTitle>

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onFilter();
              }}
              style={{ minWidth: 200 }}
            />

            <div
              style={{
                paddingTop: "0.5rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button size="sm" color="primary" onClick={onFilter}>
                Filter
              </Button>

              <Button size="sm" onClick={onReset}>
                Reset
              </Button>
            </div>
          </div>
        </Card>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Filter;
