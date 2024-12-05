import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

export default function StudentModal({ data, open, onSubmit, onClose }) {
  const [studentData, setStudentData] = useState({
    name: data?.name ?? "",
    age: data?.age ?? "",
    gender: data?.gender ?? "",
    education: data?.education ?? "",
    academicYear: data?.academicYear ?? "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(studentData);
  };

  return (
    <Modal isOpen={open} toggle={onClose}>
      <ModalHeader toggle={onClose}>Student Information</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter student name"
              value={studentData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input
              type="number"
              name="age"
              id="age"
              placeholder="Enter student age"
              value={studentData.age}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="gender">Gender</Label>
            <Input
              type="select"
              name="gender"
              id="gender"
              value={studentData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="education">Education</Label>
            <Input
              type="text"
              name="education"
              id="education"
              placeholder="Enter education level"
              value={studentData.education}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="academicYear">Academic Year</Label>
            <Input
              type="number"
              name="academicYear"
              id="academicYear"
              placeholder="Enter academic year"
              value={studentData.academicYear}
              onChange={handleChange}
              min={1}
              max={5}
              required
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
