import { Chip } from "@mui/material";

const TraitChips = ({ traits = [] }) => {
  return (
    <>
      {traits.map((t) => (
        <Chip
          key={t.name}
          label={t.name}
          variant="outlined"
          onClick={(f) => f}
          onDelete={(f) => f}
        />
      ))}
    </>
  );
};

export default TraitChips;
