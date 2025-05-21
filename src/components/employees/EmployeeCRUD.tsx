const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});

// ... in your JSX, per input:
<input name="firstName" ... />
{fieldErrors.firstName && <div style={{ color: "red" }}>{fieldErrors.firstName}</div>}