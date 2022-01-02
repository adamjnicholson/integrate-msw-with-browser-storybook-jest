import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

async function getStudents() {
  return fetch("/students")
    .then((res) => res.json())
    .then((data) => data);
}

export default function Index() {
  const { data, status } = useQuery<Student[]>("students", getStudents);

  return (
    <>
      <h2 className="font-bold text-2xl text-gray-900 pb-4">Students</h2>

      {status === "error" ? "There was an error" : null}
      {status === "loading" ? "loading" : null}
      {status === "success" ? (
        <ul className="space-y-2">
          {data?.map((student) => {
            return (
              <li>
                <Link
                  className="block p-2 hover:bg-gray-300 rounded-md transition-colors"
                  to={`students/${student.uuid}`}
                >
                  {student.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
