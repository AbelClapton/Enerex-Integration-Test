import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilters = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const newFilter = {};
    if (searchParams.get("name")) newFilter.name = searchParams.get("name");
    if (searchParams.get("age"))
      newFilter.age = Number(searchParams.get("age"));
    if (searchParams.get("gender"))
      newFilter.gender = searchParams.get("gender");
    if (searchParams.get("education"))
      newFilter.education = searchParams.get("education");
    if (searchParams.get("academicYear"))
      newFilter.academicYear = Number(searchParams.get("academicYear"));

    setFilters(newFilter);
  }, [searchParams]);

  return { filters };
};
