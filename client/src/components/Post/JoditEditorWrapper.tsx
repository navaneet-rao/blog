import  { forwardRef } from "react";
import JoditEditor from "jodit-react";

interface JoditEditorWrapperProps {
  value: string;
  onChange: (newContent: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JoditEditorWrapper = forwardRef<any, JoditEditorWrapperProps>(
  ({ value, onChange }: JoditEditorWrapperProps, ref) => (
    <JoditEditor ref={ref} value={value} onChange={onChange} />
  ),
);

export default JoditEditorWrapper;
