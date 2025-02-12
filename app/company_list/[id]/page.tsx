import CompanyDetails from "components/CompanyDetail"

// Define the list page
const IdListPage: React.FC = () => {
  const recs = [
    56556915, 53938838, 18656035, 43276461, 10195420, 55016033, 47467530, 56362167, 23491747, 7584821, 21776594,
    4211342, 10909956, 47596274, 11148643, 4160964, 53068584, 55883677, 44597548, 54813562, 57544641, 37066783,
    45206273, 42851860, 4116225, 12760858, 56739311, 57028703, 53927583, 41922392, 3081893, 56244584, 12587815,
    31723608, 19390514, 38808915, 55218902, 3863172, 56731501, 55560540,
  ]

  return (
    <div className="container p-6">
      <h1 className="mb-4 text-2xl font-bold">Recommended Companies</h1>
      <div className="flex flex-col">
        {recs.map((id) => (
          <CompanyDetails key={id} id={id} />
        ))}
      </div>
    </div>
  )
}

export default IdListPage
