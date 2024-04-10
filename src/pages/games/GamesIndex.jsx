import { useFetchQuery } from "../../hooks/useFetchQuery"
import {GameCardSkeleton} from "../../skeletons/GameCardSkeleton.jsx";
import {GameCard} from "../../components/game/GameCard.jsx";
import {GameFormModal} from "../../components/game/GameFormModal.jsx";
import { GAME_ENDPOINTS } from "../../api/gameApi"
import {COMPANY_ENDPOINTS} from "../../api/companyApi";
import {Image} from "primereact/image";
import {Skeleton} from "primereact/skeleton";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {CompanyFormModal} from "../../components/company/CompanyFormModal.jsx";

export const GamesIndex = () => {
  const gamesQuery = useFetchQuery(
      GAME_ENDPOINTS.getAll,
      'games'
  );
  const companiesQuery = useFetchQuery(
      COMPANY_ENDPOINTS.getAll,
      'companies'
  );

  const s = useFetchQuery(
      COMPANY_ENDPOINTS.getCompanyGames,
      'companiesgames'
  );

  if(gamesQuery.isLoading || companiesQuery.isLoading) {
    return <GameCardSkeleton />
  }

  return (
    <div className=''>
      <div className='flex justify-content-between align-items-center border-bottom-1 border-cyan-600 pb-3'>
        <h1 className='mt-0'>Games</h1>
        <div className='flex gap-2'>
          {/*<Dropdown*/}
          {/*    options={companiesQuery.data.data}*/}
          {/*    name='filter-name'*/}
          {/*    optionLabel='nombre'*/}
          {/*    optionValue='id'*/}
          {/*    placeholder='Filter by company'*/}
          {/*/>*/}
          <CompanyFormModal />
          <GameFormModal companies={companiesQuery.data.data} />
        </div>
      </div>

      {gamesQuery.data.data.length ? (
          <div className='grid mt-4'>
            {gamesQuery.data.data.map(game => (
                <div className='col-12 sm:col-6 md:col-4 lg:col-3' key={game.id}>
                  <GameCard gameData={game} />
                </div>
            ))}
          </div>
      ) : (
          <div className='fit-height-screen w-full flex flex-column justify-content-center align-items-center'>
            <Image
                width='180px'
                src='/images/not-found.png'
            />
            <span className='text-2xl font-bold'>No games to show</span>
          </div>
      )}
    </div>
  )
}
