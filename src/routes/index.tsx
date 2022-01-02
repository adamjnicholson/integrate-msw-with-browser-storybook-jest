import React from "react";
import { useQuery } from "react-query";

async function getStudents() {
  return fetch("/students")
    .then((res) => res.json())
    .then((data) => data);
}

export default function Index() {
  const { data, status } = useQuery<Student[]>("students", getStudents);

  return (
    <>
      <h2>Students</h2>
      {status === "error" ? "There was an error" : null}
      {status === "loading" ? "loading" : null}
      {status === "success" ? (
        <ul>
          {data?.map((student) => (
            <li>{student.name}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
