const FilterSection = () => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-bold mb-2">Filter by:</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <select className="border py-2 px-4 w-full rounded-lg">
            <option value="jobTemplates">Job Templates</option>
          </select>
        </div>
        
        <div className="relative">
          <select className="border py-2 px-4 w-full rounded-lg">
            <option value="locations">Locations</option>
          </select>
        </div>

        <div className="relative">
          <select className="border py-2 px-4 w-full rounded-lg">
            <option value="subsidiaries">Subsidiary</option>

          </select>
        </div>

        <div className="relative">
          <select className="border py-2 px-4 w-full rounded-lg">
            <option value="seniority">Seniority</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
