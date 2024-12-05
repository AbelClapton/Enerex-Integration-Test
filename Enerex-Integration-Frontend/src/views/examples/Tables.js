/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import TableHeader from "components/TableHeader/TableHeader";

import StudentModal from "components/StudentModal/StudentModal";
import { useFilters } from "hooks/useFilters";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { studentService } from "services/student.service";

const Tables = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);

  const { filters } = useFilters();
  const [partial, setPartial] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const maxPage = data.length / pageSize;
  const orderBy = searchParams.get("orderBy");
  const asc = searchParams.get("asc") === "true";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState();
  const [counter, setCounter] = useState(0);

  const columns = [
    { name: "name", label: "Name" },
    { name: "age", label: "Age" },
    { name: "gender", label: "Gender" },
    { name: "education", label: "Education" },
    { name: "academicYear", label: "Academic Year" },
  ];

  const fetchStudents = () => {
    studentService.getStudents().then(setData).catch(console.log);
  };

  useEffect(() => fetchStudents(), []);

  useEffect(() => {
    setCounter((prev) => ++prev);
  }, [selectedStudent]);

  useEffect(() => {
    setPartial(
      data
        .filter(
          (s) =>
            !Object.entries(s).some(
              ([k, v]) =>
                k in filters &&
                ((typeof v === "string" &&
                  !v.toLowerCase().includes(filters[k].toLowerCase())) ||
                  (typeof v === "number" && v !== filters[k]))
            )
        )
        .sort((a, b) => {
          const comparator = (a, b) => {
            if (a[orderBy] < b[orderBy]) return -1;
            if (a[orderBy] > b[orderBy]) return 1;
            return 0;
          };

          const result = asc ? comparator(a, b) : comparator(b, a);
          return result === 0 ? undefined : result;
        })
        .slice(page * pageSize, (page + 1) * pageSize)
    );
  }, [data, filters, orderBy, asc, page, pageSize]);

  const showAdd = () => {
    setIsModalOpen(true);
  };

  const showEdit = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const hideEdit = () => {
    setSelectedStudent();
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    studentService
      .deleteStudent(id)
      .then(() => fetchStudents())
      .catch(console.log);
  };

  const handleWrite = (data) => {
    const onSuccess = () => {
      setSelectedStudent();
      fetchStudents();
      setIsModalOpen(false);
      setCounter((prev) => ++prev);
    };

    if (!selectedStudent)
      studentService.addStudent(data).then(onSuccess).catch(console.log);
    else
      studentService
        .updateStudent(selectedStudent.id, data)
        .then(onSuccess)
        .catch(console.log);
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader
                className="border-0"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 className="mb-0">Students</h3>
                <Button color="primary" onClick={showAdd}>
                  <i className="fa fa-plus" style={{ marginRight: "1rem" }} />
                  Add
                </Button>
              </CardHeader>
              <Table
                className="align-items-center table-flush"
                responsive
                style={{ minHeight: 300 }}
              >
                <thead className="thead-light">
                  <tr>
                    {columns.map((col) => (
                      <TableHeader key={col.name} name={col.name}>
                        {col.label}
                      </TableHeader>
                    ))}
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {partial.map((student) => (
                    <tr key={student.id}>
                      <th scope="row">
                        <span className="mb-0 text-sm">{student.name}</span>
                      </th>

                      <td>{student.age}</td>
                      <td>{student.gender}</td>
                      <td>{student.education}</td>
                      <td>{student.academicYear}</td>

                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                showEdit(student);
                              }}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              className="text-danger"
                              href="#pablo"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(student.id);
                              }}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className={page > 0 ? "" : "disabled"}>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage((prev) => --prev);
                        }}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>

                    {page > 0 && (
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage((prev) => --prev);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem className={page < maxPage ? "active" : ""}>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        {page + 1} <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>

                    {page < maxPage && (
                      <PaginationItem
                        className={page === maxPage ? "active" : ""}
                      >
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage((prev) => ++prev);
                          }}
                        >
                          {page + 2}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationLink
                        className={page < maxPage ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage((prev) => ++prev);
                        }}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>

      <StudentModal
        key={counter}
        data={selectedStudent}
        open={isModalOpen}
        onSubmit={handleWrite}
        onClose={hideEdit}
      />
    </>
  );
};

export default Tables;
