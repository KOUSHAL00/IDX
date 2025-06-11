import usePing from "../../hooks/apis/queries/usePing";

export const PingComponent = () => {
  
const { data, isLoading }=usePing();


if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <p>{"hello"+ data.message}</p>
    </>
  );
};
