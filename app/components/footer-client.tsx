import { json, type DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { ThemeSwitch } from '~/routes/resources+/theme/index.tsx'
import { getTheme } from '~/routes/resources+/theme/theme-session.server.ts'
import { ClientFooterDropdown } from './dropdowns.tsx'


export async function loader({ request }: DataFunctionArgs) {
    return json({
        requestInfo: {
            session: {
                theme: await getTheme(request)
            }
        }
    })
}


export function ClientFooter() {
    const data = useLoaderData<typeof loader>()

	return (
		<div className='container mx-auto py-6'>
			<nav className="flex justify-between">
                <Link prefetch="intent" to="/">
                    <div className="font-light">home/root</div>
                </Link>
				<div className="flex items-center gap-10">
                    <ThemeSwitch userPreference={data.requestInfo.session.theme} />
					<ClientFooterDropdown />
				</div>
			</nav>
		</div>
	)
}

