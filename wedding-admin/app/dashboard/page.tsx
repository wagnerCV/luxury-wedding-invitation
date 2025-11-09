'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Users, UserCheck, TrendingUp, Download, Search, LogOut, ArrowUpDown } from 'lucide-react'
import { supabase, type RSVP } from '@/lib/supabase'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [filteredRsvps, setFilteredRsvps] = useState<RSVP[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<'created_at' | 'name' | 'guests_count'>('created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  // Check authentication
  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser')
    if (!adminUser) {
      router.push('/')
      return
    }
    setUser(JSON.parse(adminUser))
  }, [router])

  // Fetch RSVPs
  useEffect(() => {
    fetchRSVPs()
  }, [])

  // Filter and sort RSVPs
  useEffect(() => {
    let filtered = [...rsvps]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (rsvp) =>
          rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rsvp.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === 'created_at') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else if (sortField === 'name') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredRsvps(filtered)
  }, [rsvps, searchTerm, sortField, sortDirection])

  const fetchRSVPs = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvp')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setRsvps(data || [])
    } catch (error) {
      console.error('Error fetching RSVPs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminUser')
    router.push('/')
  }

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'Telefone', 'Nº Convidados', 'Mensagem', 'Data']
    const rows = filteredRsvps.map((rsvp) => [
      rsvp.name,
      rsvp.email,
      rsvp.phone || '',
      rsvp.guests_count.toString(),
      rsvp.message || '',
      format(new Date(rsvp.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `rsvps-${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()
  }

  // Calculate statistics
  const totalRSVPs = rsvps.length
  const totalGuests = rsvps.reduce((sum, rsvp) => sum + rsvp.guests_count, 0)
  const averageGuests = totalRSVPs > 0 ? (totalGuests / totalRSVPs).toFixed(1) : '0'

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-offwhite via-sand/10 to-offwhite">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Wedding Admin</h1>
                <p className="text-sm text-gray-600">Olá, {user.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total RSVPs */}
          <div className="luxury-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total de RSVPs</p>
                <p className="text-3xl font-bold text-gray-900">{totalRSVPs}</p>
              </div>
              <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-emerald" />
              </div>
            </div>
          </div>

          {/* Total Guests */}
          <div className="luxury-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total de Convidados</p>
                <p className="text-3xl font-bold text-gray-900">{totalGuests}</p>
              </div>
              <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-burgundy" />
              </div>
            </div>
          </div>

          {/* Average Guests */}
          <div className="luxury-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Média por RSVP</p>
                <p className="text-3xl font-bold text-gray-900">{averageGuests}</p>
              </div>
              <div className="w-12 h-12 bg-sand/30 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="luxury-card p-6">
          {/* Search and Export */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por nome ou email..."
                className="luxury-input pl-11"
              />
            </div>

            {/* Export Button */}
            <button
              onClick={exportToCSV}
              className="luxury-button bg-emerald text-white hover:bg-emerald/90 flex items-center gap-2 justify-center"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-emerald/30 border-t-emerald rounded-full animate-spin" />
              <p className="mt-4 text-gray-600">A carregar...</p>
            </div>
          ) : filteredRsvps.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm ? 'Nenhum resultado encontrado' : 'Ainda não há confirmações'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      <button
                        onClick={() => handleSort('name')}
                        className="flex items-center gap-1 hover:text-emerald transition-colors"
                      >
                        Nome
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Telefone</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-700">
                      <button
                        onClick={() => handleSort('guests_count')}
                        className="flex items-center gap-1 hover:text-emerald transition-colors mx-auto"
                      >
                        Convidados
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Mensagem</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      <button
                        onClick={() => handleSort('created_at')}
                        className="flex items-center gap-1 hover:text-emerald transition-colors"
                      >
                        Data
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-900">{rsvp.name}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{rsvp.email}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{rsvp.phone || '—'}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald/10 text-emerald rounded-full font-semibold text-sm">
                          {rsvp.guests_count}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm max-w-xs truncate">
                        {rsvp.message || '—'}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm whitespace-nowrap">
                        {format(new Date(rsvp.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Results Count */}
          {!isLoading && filteredRsvps.length > 0 && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              A mostrar {filteredRsvps.length} de {totalRSVPs} confirmações
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
