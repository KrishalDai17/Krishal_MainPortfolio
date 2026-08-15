export default function AmbientBackground() {
  return (
    <>
      <div className="app-bg" aria-hidden="true" />
      <div className="bg-glow-line w-[70%] top-[22%] left-[10%]" aria-hidden="true" />
      <div
        className="bg-glow-line w-[50%] top-[68%] right-[6%]"
        style={{ animationDelay: "2.5s" }}
        aria-hidden="true"
      />
    </>
  );
}
