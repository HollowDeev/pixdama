
function authLayout({children}) {
   
    return (
        <main className='flex min-h-screen flex-col items-center justify-center px-2 py-9 md:px-16 gap-10 text-white'>
            {children}
        </main>
    )
}

export default authLayout