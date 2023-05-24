export default function ErrorInput({ color, children }) {
  return (
    <div
      style={{
        color,
        fontSize: '1.7rem',
        fontWeight: '600',
        marginTop: '0.3em',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}
